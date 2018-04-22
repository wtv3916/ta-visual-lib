# TA Visual Regression Testing Library

> Why choose the docker [kenith/ta-visual-lib](https://hub.docker.com/r/kenith/ta-visual-lib/) for Visual Regression Testing: 
> 1. With no VNC supports, we could debug our script easier and more flexible
![alt text](https://raw.githubusercontent.com/kenith/ta-visual-lib/dev/noVPC_Sample.png)
> 2. Support latest **BackstopJS** and **Gemini** in one docker image
> 3. Installed browsers, such as Chrome, Firefox, PhantomJS for testing, which you do NOT need to take time to config your browsers
> 4. Provided samples for BackstopJS and Gemini

## Content
- [Build](#build)
- [Supports](#supports)
- [User Docker Step by Step](#use-docker-step-by-step)
- [Use Docker Directly](#use-docker-directly)
- [Proxy](#proxy)
- [Samples](#samples)
- [System Info](#system-info)
- [Useful Links](#useful-links)

## Build
Get the source and sample from git hub [kenith/ta-visual-lib](https://github.com/Kenith/ta-visual-lib), and build image: `docker build -t ta-visual-lib .`

Or, pull the image from docker hub - [kenith/ta-visual-lib](https://hub.docker.com/r/kenith/ta-visual-lib/): `docker pull kenith/ta-visual-lib:latest`

## Supports
For now, we support the following Visual Regression Testing Library.
No matter which tool you use, if no necessary, we suggest to use Chrome for Visual Regression.

1. [BackstopJS - 3.2.15](https://github.com/garris/BackstopJS)

2. [Gemini - 5.6.2](https://github.com/gemini-testing/gemini)

## Use Docker Step by Step
**1. Assuming that you have copied the "Sample" folder to the ~/Debug to assign the local path ~/Debug to docker path /tmp, and start the docker container**
   ```
   docker run \
        -v ~/Debug:/tmp \
        --rm \
        -p 6901:6901 \
        -p 5901:5901 \
        --shm-size 2048m \
        kenith/ta-visual-lib:latest
   ```
   
**2. Access the [http://localhost:6901/?password=vncpassword/](http://localhost:6901/?password=vncpassword/) to the noVNC Env**
![alt text](https://raw.githubusercontent.com/kenith/ta-visual-lib/dev/noVPC_Sample.png)

**3. Open terminal and cd to your folder: cd /tmp**

**4. If using BackstopJS**
- For example, cd to the folder **BackstopJS_Chrome_ChromyEngine_SimulatePC&iPhone**.
- Update the proxy in backstop.json for necessary, if behind the proxy
- Create reference: `backstop reference`
- Create Test: `backstop test`
- You could find your test result in the folder: **backstop_data**

**5. If using Gemini**
- For example, cd to the folder **Gemini_Chrome_SimulatePC&iPhone**.
- Update the proxy in .gemini.js for necessary, if behind the proxy
- Start the chrome driver: `chromedriver --port=6666 --silent &`
- Create reference: `gemini update demo.js`
- Create Test: `gemini test demo.js`

## Use Docker Directly
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
        --shm-size 2048m \
        kenith/ta-visual-lib:latest \
        /bin/bash -c "cd /tmp/Sample/BackstopJS_Chrome_ChromyEngine_SimulatePC&iPhone; backstop reference"
     ```

- Run Test
    ```
     docker run \
        -v ~/Debug:/tmp \
        --rm \
        -p 6901:6901 \
        -p 5901:5901 \
        --shm-size 2048m \
        kenith/ta-visual-lib:latest \
        /bin/bash -c "cd /tmp/Sample/BackstopJS_Chrome_ChromyEngine_SimulatePC&iPhone; backstop test"
     ```

**4. If using Gemini**
- Create Reference
    ```
    docker run \
        -v ~/Debug:/tmp \
        --rm \
        --shm-size 2048m \
        kenith/ta-visual-lib:latest \
        /bin/bash -c "cd /tmp/Sample/Gemini_Chrome_SimulatePC\&iPhone/; chromedriver --port=6666 --silent & gemini update demo.js"
    ```

- Run Test
    ```
    docker run \
        -v ~/Debug:/tmp \
        --rm \
        --shm-size 2048m \
        kenith/ta-visual-lib:latest \
        /bin/bash -c "cd /tmp/Sample/Gemini_Chrome_SimulatePC\&iPhone/; chromedriver --port=6666 --silent & gemini test demo.js"
    ```

## Proxy
If you are struggling with the proxy, try to solve the proxy issue by followings

**1. Just edit your proxy as following:**

- **Backstop-Chrome-ChromyEngine**
   ```
   "chromeFlags": [
      "--disable-gpu", 
      "--force-device-scale-factor=1", 
      "--disable-infobars=true",
      "--proxy-server=172.17.0.1:3128"
    ]
   ```
 

- **Backstop-Chrome-PuppeteerEngine**
   ```
   "engineOptions": {
        "ignoreHTTPSErrors": true,
        "args": [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-gpu", 
          "--force-device-scale-factor=1", 
          "--disable-infobars=true",
          "--proxy-server=172.17.0.1:3128"
        ]
    }
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
 

- **Gemini-PhantomJS**

  Run the phantomJS driver as bellow:
  ``` 
  phantomjs --webdriver=9999 --ignore-ssl-errors==true --proxy=172.17.0.1:3128
  ```


**2. If you are behind the NTLM proxy**

  You could use the [robertdebock/docker-cntlm](https://hub.docker.com/r/robertdebock/docker-cntlm/) to create a sub proxy.
The proxy for docker container using, should be something like: 172.17.0.1:3128. Then config the proxy as above.

## Samples
You could refer to the samples to get started for visual regression testing.
- For BackstopJS+Firefox, no sample provided, bug here: [Issue-311](https://github.com/garris/BackstopJS/issues/311) 

- For Gemini, we **DO NOT** suggest to use Selenium-Standalone for managing web-driver, except Firefox. Just use web-driver directly to make sure less dimensions to cause risks and unexpected issues. If you insist, you could use it, we have installed selenium-server 2.53.1 for it. 

**1. BackstopJS_Chrome_ChromyEngine_SimulatePC&iPhone**
- Suggest to set `"debugWindow": false` if running test

**2. BackstopJS_Chrome_ChromyEngine_SimulateCookie&UserActions**
- Suggest to set `"debugWindow": false` if running test
- For passing cookie, if you site is using http, please edit backstop_data/engine_scripts/chromy/loadCookies.js: `cookie.url = 'http://' + cookie.domain;`
- You could edit the backstop_data/engine_scripts/chromy/onReady.js to edit the user actions. All the defined user actions could be found in interactions.js

**3. BackstopJS_Chrome_PuppeteerEngine_SimulatePC&iPhone**
- Suggest to set `"debugWindow": false` if running test

**4. BackstopJS_Chrome_PuppeteerEngine_SimulateCookie&UserActions**
- Suggest to set `"debugWindow": false` if running test
- For passing cookie, if you site is using http, please edit backstop_data/engine_scripts/chromy/loadCookies.js: `cookie.url = 'http://' + cookie.domain;`
- You could edit the backstop_data/engine_scripts/puppet/onReady.js to edit the user actions. 

**5. BackstopJS_PhantomJS_SimulatePC&iPhone**
- Don't have parallel testing, see the [issue-591](https://github.com/garris/BackstopJS/issues/591)
- Customized the backstop_data/engine_scripts/casper/onReady.js, and backstop_data/engine_scripts/casper/onBefore.js to avoid the hang on issue - [issue-599](https://github.com/garris/BackstopJS/issues/599)

**6. Gemini_Chrome_SimulatePC&iPhone**
- Start chrome driver before testing: `chromedriver --port=6666 --silent &`
- Suggest to set "--headless" in args if running test
- if "--proxy-sever" and "--headless" are both set in args, for some certain scenarios, blank page will be captured.

**7. Gemini_Chrome_SimulateUserActions**
- Start chrome driver before testing: `chromedriver --port=6666 --silent &`
- Suggest to set "--headless" in args if running test
- if "--proxy-sever" and "--headless" are both set in args, for some certain scenarios, blank page will be captured.

**8. Gemini_Firefox_SimulatePC&iPhone**
- Start the selenium-standalone before testing: `selenium-standalone start`
- No headless mode of which is provided by Firefox 56+
- Need Help to pass the user agent: [https://github.com/gemini-testing/gemini/issues/907](https://github.com/gemini-testing/gemini/issues/907)

**9. Gemini_PhantomJS_SimulatePC&iPhone**
- Start phantomjs driver before testing: `phantomjs --webdriver=9999 --ignore-ssl-errors=true`
- Not suggest to use Phantom for test, could trigger error "'unsafe-eval' is not an allowed", and no solution: [ariya/phantomjs#13114](https://github.com/ariya/phantomjs/issues/13114). 
- Global Settings Bug: [https://github.com/gemini-testing/gemini/issues/908](https://github.com/gemini-testing/gemini/issues/908)

## System Info
1. OS: CentOS 7

2. Chrome v66.0.3359.117 - ChromeDriver v2.38

3. Firefox v47.0.2 - GeckoDriver v0.13.0 
   Gemini - Firefox 47.0.2 for test: [https://github.com/gemini-testing/gemini/issues/688](https://github.com/gemini-testing/gemini/issues/688)
   BackstopJS - Firefox: No matter using Slimer 0.10.3 or 1.0.0, the backstopjs has a bug here: [https://github.com/garris/BackstopJS/issues/311](https://github.com/garris/BackstopJS/issues/311)

4. PhantomJS v2.1.1

5. NodeJS v8.x

6. NPM v5.6.0

7. BackstopJS v3.2.15

8. CasperJS v1.1.4

9. SlimerJS v1.0.0

10. Gemini v5.6.2

11. Gemini GUI v6.0.1

12. Gemini HTML Reporter v2.14.0

13. Selenium Standalone v6.12.0

14. Selenium Server v2.5.31 to support firefox for Gemini: [issue-643](https://github.com/gemini-testing/gemini/issues/643#issuecomment-278339739)

15. Java v1.8.0.161

16. User with sudo access: ta-visual-lib

## Useful Links
1. iOS Resolution: [http://iosres.com/](http://iosres.com/)

2. All possible screen size: [http://screensiz.es/](http://screensiz.es/)

3. Chrome Flags: [https://peter.sh/experiments/chromium-command-line-switches/](https://peter.sh/experiments/chromium-command-line-switches/)

4. Firefox Flags: [http://kb.mozillazine.org/Command_line_arguments](http://kb.mozillazine.org/Command_line_arguments)

5. SmilerJS Flags: [https://docs.slimerjs.org/current/configuration.html](https://docs.slimerjs.org/current/configuration.html)

6. Phantom Flags: [http://phantomjs.org/api/command-line.html](http://phantomjs.org/api/command-line.html)

7. CasperJS Documentation: [http://docs.casperjs.org/en/latest/](http://docs.casperjs.org/en/latest/)

8. Firefox User Agents: [https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent/Firefox](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent/Firefox)

9. Chrome User Agents: [https://developer.chrome.com/multidevice/user-agent](https://developer.chrome.com/multidevice/user-agent)

10. Desired Capabilities: [https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities)
