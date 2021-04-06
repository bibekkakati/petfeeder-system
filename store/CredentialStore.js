var CredentialStore = (function () {
	var _data = {
		ABY12J: "a1b2c3d4",
	};

	function add(id, pass) {
		_data[id] = pass;
		return true;
	}

	function get(id) {
		return _data[id] || false;
	}

	function verify(id, pass) {
		if (id && pass && _data[id] === pass) {
			return true;
		}
		return false;
	}

	return {
		add: add,
		get: get,
		verify: verify,
	};
})();

module.exports = CredentialStore;
