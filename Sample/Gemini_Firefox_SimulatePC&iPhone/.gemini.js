module.exports = {
    rootUrl: 'https://github.com/gemini-testing/gemini',
    gridUrl: 'http://127.0.0.1:4444/wd/hub',
    sessionRequestTimeout: 120000,
    tolerance: 3.5,
    compositeImage: true,
    sessionsPerBrowser: 4,
    retry: 1,
    screenshotMode: 'fullpage',
    sessionRequestTimeout: 120000,
    httpTimeout: 60000,
    sessionQuitTimeout: 30000,

    browsers: {
        iPhone6_6s_7_8: {
            windowSize: '375x667',
            desiredCapabilities: {
                browserName: 'firefox',
                platformName: 'ANY',
                // proxy: {
                //     proxyType: 'manual',
                //     httpProxy: '172.17.0.1:3128',
                //     sslProxy: '172.17.0.1:3128',
                // },
                acceptInsecureCerts: true,
                acceptSslCerts: true,
                "moz:firefoxOptions": {
                    prefs: {
                        'general.useragent.override': 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) FxiOS/1.0 Mobile/12F69 Safari/600.1.4',
                    }
                }
            },
        },
        PC: {
            windowSize: '1024x768',
            desiredCapabilities: {
                browserName: 'firefox',
                // proxy: {
                //     proxyType: 'manual',
                //     httpProxy: '172.17.0.1:3128',
                //     sslProxy: '172.17.0.1:3128',
                // },
                acceptInsecureCerts: true,
                acceptSslCerts: true
            },
        },
    },

    system: {
        plugins: {
            'html-reporter/gemini': {
                enabled: true,
                path: 'gemini-report',
            },
        },
        debug: false,
    },

};