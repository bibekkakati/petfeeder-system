var MessagingTokenStore = (function () {
	var _data = {};

	function add(id, token) {
		_data[id] = token;
		return true;
	}

	function get(id) {
		return _data[id] || false;
	}

	function clear(id) {
		if (_data.hasOwnProperty(id)) {
			delete _data[id];
		}
		return true;
	}

	return {
		add: add,
		get: get,
		clear: clear,
	};
})();

module.exports = MessagingTokenStore;
