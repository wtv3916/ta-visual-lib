module.exports = {
    rootUrl: 'http://detectmobilebrowsers.com/',
    gridUrl: 'http://127.0.0.1:9999',
    sessionRequestTimeout: 120000,
    tolerance: 3.5,
    compositeImage: true,
    sessionsPerBrowser: 4,
    retry: 3,
    screenshotMode: 'auto',
    sessionRequestTimeout: 120000,
    httpTimeout: 60000,
    sessionQuitTimeout: 30000,

    browsers: {
        iPhone6_6s_7_8: {
            windowSize: '375x667',
            desiredCapabilities: {
                browserName: 'phantomjs',
                // Bug: Once set the userAgent as following, it becomes the global settings, not expected.
                'phantomjs.page.settings.userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
            },
        },
        PC: {
            windowSize: '1920x1080',
            desiredCapabilities: {
                browserName: 'phantom',
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