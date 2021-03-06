FROM consol/centos-xfce-vnc:latest

MAINTAINER Wang Cheng (Ken) "463407426@qq.com"
ENV REFRESHED_AT 2018-04-22

# Set proxy if necessary
# ENV http_proxy 127.0.0.1:3128
# ENV https_proxy 127.0.0.1:3128

ARG CHROME=latest
# Gemini - Firefox 47.0.2 for test: https://github.com/gemini-testing/gemini/issues/688
# BackstopJS - Firefox: No matter using Slimer 0.10.3 or 1.0.0, the backstopjs has a bug here: https://github.com/garris/BackstopJS/issues/311
ARG FIREFOX_VERSION=47.0.2
ARG GECKO_VERSION=0.13.0
ARG PHANTOMJS_VERSION=2.1.1
ARG CHROMEDRIV_VERSION=2.38
ARG CASPERJS_VERSION=1.1.4
ARG SLIMERJS_VERSION=1.0.0
ARG BACKSTOPJS_VERSION=3.2.15
ARG GEMINI_VERSION=5.6.2
ARG GEMINIGUI_VERSION=6.0.1
ARG GEMINIHTMLREPORTER_VERSION=2.14.0
ARG SELENIUMSTANDALONE_VERSION=6.12.0
ARG NODEJS_VERSION=8.x
ARG NPM_VERSION=5.6.0
ARG USER=ta-visual-lib
# Use 2.53.1 to support firefox for Gemini: https://github.com/gemini-testing/gemini/issues/643#issuecomment-278339739
ARG SELENIUM_SERVER_VERSION=2.53.1


# Switch back to root user for extend the consol/centos-xfce-vnc:latest
# For more info, please refer to https://github.com/ConSol/docker-headless-vnc-container
USER 0
RUN id

# Install deltarpm in case slow network
RUN echo "Installing deltarpm..." \
    && yum install -y deltarpm

# Install PhantomJs
RUN echo "Installing phantomjs v${PHANTOMJS_VERSION}..." \
    && mkdir -p /opt/phantomjs \
    && curl -Lk https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-${PHANTOMJS_VERSION}-linux-x86_64.tar.bz2 | tar -xj --strip-components 1 -C /opt/phantomjs \
    && ln -s /opt/phantomjs/bin/phantomjs /usr/bin/phantomjs

# Install Firefox
RUN echo "Installing firefox v${FIREFOX_VERSION}..." \
    && rm -rf /usr/lib/firefox \
    && rm -f /usr/bin/firefox \
    && rm -f ~/Desktop/firefox.desktop \
    && wget -qO- --no-check-certificate https://ftp.mozilla.org/pub/mozilla.org/firefox/releases/${FIREFOX_VERSION}/linux-x86_64/en-US/firefox-${FIREFOX_VERSION}.tar.bz2 | tar xj -C /usr/lib \
    && ln -s /usr/lib/firefox/firefox /usr/bin/firefox \
    && wget -qO- --no-check-certificate https://github.com/mozilla/geckodriver/releases/download/v${GECKO_VERSION}/geckodriver-v${GECKO_VERSION}-linux64.tar.gz | tar xz -C /usr/local/bin/

# Install Zip
RUN yum install -y unzip

# Install chrome
RUN echo "Installing chrome v${CHROME}..." \
    && yum remove -y chromium \
    && rm -f ~/Desktop/chromium-browser.desktop \
    && echo -e '[google-chrome]\nname=google-chrome\nbaseurl=http://dl.google.com/linux/chrome/rpm/stable/$basearch\nenabled=1\ngpgcheck=1\ngpgkey=https://dl-ssl.google.com/linux/linux_signing_key.pub' | tee /etc/yum.repos.d/google-chrome.repo \
    && wget --no-check-certificate https://dl-ssl.google.com/linux/linux_signing_key.pub \
    && rpm --import linux_signing_key.pub \
    && rm -f linux_signing_key.pub \
    && yum install -y google-chrome-stable \
    && yum clean all \
    && curl -Lk https://chromedriver.storage.googleapis.com/${CHROMEDRIV_VERSION}/chromedriver_linux64.zip > /tmp/chromedriver_linux64.zip \
    && unzip /tmp/chromedriver_linux64.zip -d /usr/bin/ \
    && rm /tmp/chromedriver_linux64.zip \
    && sed -i 's/\"$@\"/\"$@\" --no-sandbox/' /opt/google/chrome/google-chrome

# Install NPM & NodeJS
RUN echo "Installing npm & nodejs by yum..." \
    && yum install -y gcc-c++ make \
    && curl -Lk --silent --location https://rpm.nodesource.com/setup_${NODEJS_VERSION} | sudo bash - \
    && yum install -y nodejs

RUN echo "Installing Java..." \
    && yum install -y java

# NPM Settings
RUN npm config set registry http://registry.npmjs.org/ \
#    && npm config set user 10000 \
    && npm config set unsafe-perm true \
    && npm config set prefix "/usr/local/"

# Update NPM & NodeJS
#RUN echo "Update NodeJS to v${NODEJS_VERSION}..." \
#    && npm install -g n \
#    && n v${NODEJS_VERSION} \
#    && echo "Update NPM to v${NPM_VERSION}..." \
#    && npm install -g npm@${NPM_VERSION}

# Installing CasperJS
RUN echo "Installing casperjs v${CASPERJS_VERSION}..." \
    && npm install -g casperjs@${CASPERJS_VERSION}

# Installing SlimerJS
RUN echo "Installing slimerjs v${SLIMERJS_VERSION}..." \
    && npm install -g slimerjs@${SLIMERJS_VERSION}

# Installing BackstopJS
# Notice the puppeteer on Centos issue here: https://github.com/GoogleChrome/puppeteer/issues/391
RUN echo "Installing BackstopJS v${BACKSTOPJS_VERSION}..." \
	&& npm install -g backstopjs@${BACKSTOPJS_VERSION} \
	&& yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 ipa-gothic-fonts xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 xorg-x11-fonts-misc -y

# Installing Gemini
RUN echo "Installing Gemini v${GEMINI_VERSION}..." \
	&& npm install -g gemini@${GEMINI_VERSION} \
	&& npm install -g selenium-standalone@${SELENIUMSTANDALONE_VERSION} \
	&& npm install -g gemini-gui@${GEMINIGUI_VERSION} \
	&& npm install -g html-reporter@${GEMINIHTMLREPORTER_VERSION}

# Copy default-config.js
COPY default-config.js /usr/local/lib/node_modules/selenium-standalone/lib/

# Installing Selenium Standalone Dependencies
RUN echo "Installing Selenium-Server v${SELENIUM_SERVER_VERSION}, ChromeDriver v${CHROMEDRIV_VERSION}, GeckDriver v${GECKO_VERSION}" \
    && selenium-standalone install

# Create a user ${user} (uid=10000) in the group ${user} (gid=10000)
RUN adduser -m -u 10000 -U ${USER} \
    && usermod -aG wheel ${USER} \
    && sed -i "\$a${USER} ALL=(ALL) NOPASSWD: ALL" /etc/sudoers \
    && chmod u+s /usr/bin/sudo \
    && chown -R ${USER}:${USER} /home/${USER} \
    && chown -R ${USER}:${USER} /usr/local/lib/node_modules \
    && chown -R ${USER}:${USER} /usr/local/bin

# Change user from root -> ${user}
USER ${USER}
RUN id

# Create Work Dir
WORKDIR /TA-Visual-Lib
COPY --chown=10000:10000 . /TA-Visual-Lib
