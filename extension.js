// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { renderGraphFromSource } = require('graphviz-cli');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "test-graphviz" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('test-graphviz.helloWorld', async function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		const input = `
		digraph "Example" {
			graph [ label = "Example" ];
			node [ color = "blue", shape =Mdiamond ];
			edge [ color = "red", label = "Say" ];
			"Hello";
			"World";
			"Hello" -> "World";
		}`;
		const svg = await renderGraphFromSource({ input }, { format: 'svg' });
		console.log(svg);
		const excerpt = svg.indexOf('<g');
		vscode.window.showInformationMessage(`${svg.substring(excerpt, excerpt + 100)}...

See the console for the complete SVG output.`);
		const png = await renderGraphFromSource({ input }, { format: 'svg' });
		console.log('PNG size:', png.length);
});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
