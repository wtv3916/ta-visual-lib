module.exports = {
    rootUrl: 'http://jmeter.apache.org/',
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
            },
        },
        PC: {
            windowSize: '1024x768',
            desiredCapabilities: {
            browserName: 'phantomjs',
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