const { GoogleSpreadsheet } = require('google-spreadsheet');

module.exports = class Sheet {
	constructor() {
		this.doc = new GoogleSpreadsheet('1X1Or94-beaSsGPOAznGG9E8wFioZ1LHmoqEFqhT6004');
	}

	async load() {
		//load credentials for api access from json file
		await this.doc.useServiceAccountAuth(require('./credentials.json'));

		// load document properties and worksheets
		await this.doc.loadInfo();
		console.log(this.doc.title);
	}

	async getRows() {
		const sheet = this.doc.sheetsByIndex[0];
		return await sheet.getRows();
	}
};
