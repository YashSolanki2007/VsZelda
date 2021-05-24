// Making the imports
const vscode = require('vscode');
const axios = require("axios");

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {

	// Return the api data 
	const datas = await axios.get("https://zelda-api.apius.cc/api/bosses?limit=130")

	const resData = datas.data.data.map(data => {
		return {
			label: data.name,
			detail: data.description,
		}
	});

	console.log('Congratulations, your extension "vszelda" is now active!');

	let disposable = vscode.commands.registerCommand('vszelda.Get Zelda Bosses', async function () {
		const returnData = await vscode.window.showQuickPick(resData, {
			matchOnDetail: true,
		})
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
