module.exports = {
    rootUrl: 'https://github.com/gemini-testing/gemini/releases',
    gridUrl: 'http://127.0.0.1:6666',
    sessionRequestTimeout: 120000,
    tolerance: 3.6,
    compositeImage: true,
    sessionsPerBrowser: 4,
    retry: 3,
    screenshotMode: 'viewport',
    sessionRequestTimeout: 120000,
	httpTimeout: 60000,
	sessionQuitTimeout: 30000,

    browsers: {
        PC: {
            windowSize: '1920x1080',
            desiredCapabilities: {
                browserName: 'chrome',
                chromeOptions: {
                	args: ['--ignore-certificate-errors', '--disable-gpu'],
//                	args: ['--ignore-certificate-errors', '--disable-gpu', '--proxy-server=172.17.0.1:3128'],
                },
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