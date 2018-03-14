# TA Visual Regression Testing Library

## Build
Get the source from git [Kenith/ta-visual-lib](https://github.com/Kenith/ta-visual-lib), and build image: `docker build -t ta-visual-lib .`

Or, pull the image from docker hub - [kenith/ta-visual-lib](https://hub.docker.com/r/kenith/ta-visual-lib/): `docker pull kenith/ta-visual-lib:latest`

## Supports
For now, we support the following Visual Regression Testing Library.
No matter which tool you use, if no necessary, we suggest to use Chrome for Visual Regression.

1. [BackstopJS - 3.1.17](https://github.com/garris/BackstopJS) - Unstable if engine=chrome, and asyncCaptureLimit > 2: [Issue-663](https://github.com/garris/BackstopJS/issues/663)

2. [Gemini - 5.5.1](https://github.com/gemini-testing/gemini)  - **Recommend**

## Pre-Conditions If Behind the Proxy
If you are struggling with the proxy, try to solve the proxy issue by followings

**1. Just edit your proxy as following:**

- **Backstop-Chrome**
   ```
   "chromeFlags": [
      "--disable-gpu", 
      "--force-device-scale-factor=1", 
      "--disable-infobars=true",
      "--proxy-server=172.17.0.1:3128"
    ]
   ```
 

- **Backstop-PhantomJS&Firefox**
   ``` 
   "casperFlags": [
    "--ignore-ssl-errors=true", 
    "--ssl-protocol=any",
    "--engine=phantomjs", 
    "--proxy=172.17.0.1:3128"
    ], 
   ```
 

- **Gemini-Chrome**
   ```
   args: ['--ignore-certificate-errors', '--disable-gpu', '--proxy-server=172.17.0.1:3128']
   ```
 

- **Gemini-Firefox**

  For more info about proxy support: [issue-97](https://github.com/mozilla/geckodriver/issues/97)
   ```
   proxy: {
     proxyType: 'manual',
     httpProxy: '172.17.0.1:3128',
     sslProxy: '172.17.0.1:3128',
   }
   ```
 

- **Gemini+PhantomJS**

  Need help here: [issue-895](https://github.com/gemini-testing/gemini/issues/895)

**2. If you are behind the NTLM proxy, you could use the [robertdebock/docker-cntlm](https://hub.docker.com/r/robertdebock/docker-cntlm/) to create a sub proxy.
The proxy for docker container using, should be something like: 172.17.0.1:3128. Then config the proxy as above. **

## Samples
You could refer to the samples to get started for visual regression testing.
- For BackstopJS+Firefox, no sample provided, bug here: [Issue-311](https://github.com/garris/BackstopJS/issues/311)

- For Gemini+Chrome, if "--proxy-sever" and "--headless" are both set in args, for some certain scenarios, blank page will be captured. 

- For Gemini, we **DO NOT** suggest to use Selenium-Standalone for managing web-driver, except Firefox. Just use web-driver directly to make sure less dimensions to cause risks and unexpected issues. If you insist, you could use it, we have installed selenium-server 2.53.1 for it. 

- For Gemini+Firefox, only could run against selenium-standalone.

**1. BackstopJS_Chrome_SimulatePC&iPhone**
- Suggest to set `"debugWindow": false` if running test
- Not really emulate the mobile, just the view port

**2. BackstopJS_Chrome_SimulateCookie&UserActions**
- Suggest to set `"debugWindow": false` if running test
- Not really emulate the mobile, just the view port
- For passing cookie, if you site is using http, please edit backstop_data/engine_scripts/chromy/loadCookies.js: `cookie.url = 'http://' + cookie.domain;`
- You could edit the backstop_data/engine_scripts/chromy/onReady.js to edit the user actions. All the defined user actions could be found in interactions.js

**3. BackstopJS_PhantomJS_SimulatePC&iPhone**
- Don't have parallel testing, see the [issue-591](https://github.com/garris/BackstopJS/issues/591)
- Not really emulate the mobile, just the view port
- Customized the backstop_data/engine_scripts/casper/onReady.js, and backstop_data/engine_scripts/casper/onBefore.js to avoid the hang on issue - [issue-599](https://github.com/garris/BackstopJS/issues/599)

**4. Gemini_Chrome_SimulatePC&iPhone**
- Start chrome driver before testing: `chromedriver --port=6666 --silent &`
- Suggest to set "--headless" in args if running test

**5. Gemini_Firefox_SimulatePC&iPhone**
- Start the selenium-standalone before testing: `selenium-standalone start`
- Not really emulate the mobile, just the view port
- No headless mode of which is provided by Firefox 56+

## Start & Use Docker Step By Step - Chrome as reference
**1. Copy the "Sample" folder to the ~/Debug to assign the local path ~/Debug to docker path /tmp, and start the docker container**
   ```
   docker run \
        -v ~/Debug:/tmp \
        --rm \
        -p 6901:6901 \
        -p 5901:5901 \
        --shm-size 1024m \
        kenith/ta-visual-lib:latest
   ```
   
  
**2. Access the [http://localhost:6901/?password=vncpassword/](http://localhost:6901/?password=vncpassword/) to the noVNC Env**

**3. Open terminal and cd to your folder: cd /tmp**

**4. If using BackstopJS**
- For example, cd to the BackstopJS_Chrome_SimulatePC&iPhone.
- Update the proxy in backstop.json for necessary, if behind the proxy
- Create reference: `backstop reference`
- Create Test: `backstop test`
- You could find your test result in the folder: **backstop_data**

**5. If using Gemini**
- For example, cd to the Gemini_Chrome_SimulatePC&iPhone.
- Update the proxy in .gemini.js for necessary, if behind the proxy
- Start the chrome driver: `chromedriver --port=6666 --silent &`
- Create reference: `gemini update institutional.js`
- Create Test: `gemini test institutional.js`

## Start & Use Docker Directly
**1. Assume you have copied the folder "Sample" to the ~/Debug**

**2. Update the proxy in backstop.json, or .gemini.js if behind the proxy**

**3. If using BackstopJS**
- Create Reference
     ```
     docker run \
        -v ~/Debug:/tmp \
        --rm \
        -p 6901:6901 \
        -p 5901:5901 \
        --shm-size 1024m \
        kenith/ta-visual-lib:latest \
        /bin/bash -c "cd /tmp/Sample/BackstopJS_Chrome_SimulatePC\&iPhone; backstop reference"
     ```

- Run Test
    ```
     docker run \
        -v ~/Debug:/tmp \
        --rm \
        -p 6901:6901 \
        -p 5901:5901 \
        --shm-size 1024m \
        kenith/ta-visual-lib:latest \
        /bin/bash -c "cd /tmp/Sample/BackstopJS_Chrome_SimulatePC\&iPhone; backstop test"
     ```

**4. If using Gemini**
- Create Reference
    ```
    docker run \
        -v ~/Debug:/tmp \
        --rm \
        --shm-size 1024m \
        kenith/ta-visual-lib:latest \
        /bin/bash -c "cd /tmp/Sample/Gemini_Chrome_SimulatePC\&iPhone/; chromedriver --port=6666 --silent & gemini update demo.js"
    ```

- Run Test
    ```
    docker run \
        -v ~/Debug:/tmp \
        --rm \
        --shm-size 1024m \
        kenith/ta-visual-lib:latest \
        /bin/bash -c "cd /tmp/Sample/Gemini_Chrome_SimulatePC\&iPhone/; chromedriver --port=6666 --silent & gemini test demo.js"
    ```

## System Info:
1. OS: CentOS 7

2. Chrome v65.0.3325.146 - ChromeDriver v2.36

3. Firefox v47.0.2 - GeckoDriver v0.13.0 
    Because, Gemini only support firefox < 48, and SlimerJS only support firefox from 38.0.0 - 52.*. So we select Firefox version 47.0.2 for test: [issue-688](https://github.com/gemini-testing/gemini/issues/688)

4. PhantomJS v2.1.1

5. NodeJS v8.9.4

6. NPM v5.6.0

7. BackstopJS v3.1.17

8. CasperJS v1.1.4

9. SlimerJS v0.10.3

10. Gemini v5.5.1

11. Gemini GUI v5.3.1

12. Gemini HTML Reporter v2.6.1

13. Selenium Standalone v6.12.0

14. Selenium Server v2.5.31 to support firefox for Gemini: [issue-643](https://github.com/gemini-testing/gemini/issues/643#issuecomment-278339739)

15. Java v1.8.0.161

16. User with sudo access: ta-visual-lib

## Useful Links
1. iOS Resolution: [http://iosres.com/](http://iosres.com/)

2. All possible screen size: [http://screensiz.es/](http://screensiz.es/)

3. Chrome Flags: [https://peter.sh/experiments/chromium-command-line-switches/](https://peter.sh/experiments/chromium-command-line-switches/)

4. SmilerJS Flags: [https://docs.slimerjs.org/current/configuration.html](https://docs.slimerjs.org/current/configuration.html)

5. Phantom Flags: [http://phantomjs.org/api/command-line.html](http://phantomjs.org/api/command-line.html)

6. CasperJS Documentation: [http://docs.casperjs.org/en/latest/](http://docs.casperjs.org/en/latest/)

7. Firefox User Agents: [https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent/Firefox](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent/Firefox)

8. Chrome User Agents: [https://developer.chrome.com/multidevice/user-agent](https://developer.chrome.com/multidevice/user-agent)

9. Desired Capabilities: [https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities)
