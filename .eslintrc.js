module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "airbnb",
	'globals': {
		"Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 11
    },
    "plugins": [
        "react"
    ],
    "rules": {
        'linebreak-style': [
            'error',
            'windows'
        ],
        'semi': [
            'error',
            'never'
        ]
    }
};
