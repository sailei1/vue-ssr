var path = require('path');

var detail = require(path.join(__dirname, 'db/detail.json'));


module.exports = function () {
	return {
		"detail1"          : detail,
        "detail"          : detail,
	}
};
