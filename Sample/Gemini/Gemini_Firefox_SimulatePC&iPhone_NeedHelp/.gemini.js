module.exports = {
    rootUrl: 'http://detectmobilebrowsers.com/',
    gridUrl: 'http://127.0.0.1:4444/wd/hub',
    sessionRequestTimeout: 120000,
    tolerance: 3.6,
    compositeImage: true,
    sessionsPerBrowser: 4,
    retry: 3,
    screenshotMode: 'fullpage',
    sessionRequestTimeout: 120000,
    httpTimeout: 60000,
    sessionQuitTimeout: 30000,

    browsers: {
        iPhone6_6s_7_8: {
            windowSize: '375x667',
            desiredCapabilities: {
                browserName: 'firefox',
                // proxy: {
                //     proxyType: 'manual',
                //     httpProxy: '172.17.0.1:3128',
                //     sslProxy: '172.17.0.1:3128',
                // },
                acceptInsecureCerts: true,
                acceptSslCerts: true,
                // The following firefox options are not working. We are tracking the issue.   
                'moz:firefoxOptions': {
                        'prefs': {
                            "general.useragent.override": 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
                        },
                },
            },
        },
        PC: {
            windowSize: '1920x1080',
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