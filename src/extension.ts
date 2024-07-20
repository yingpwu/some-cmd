// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "some-cmd" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    // 复制根目录的路径
    const copy_root_path = vscode.commands.registerCommand("some-cmd.copy_root_path", () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders && workspaceFolders.length > 0) {
            // Get the path of the first workspace folder
            const workspacePath = workspaceFolders[0].uri.fsPath;
            // Display the path in a message box
            vscode.window.showInformationMessage(`Workspace Path: ${workspacePath} copied`);
            vscode.env.clipboard.writeText(workspacePath);
        } else {
            vscode.window.showInformationMessage("No workspace folder found.");
        }
        // 复制到剪切板
    });

    //打开根目录
    const reveal_root_path = vscode.commands.registerCommand("some-cmd.reveal_root_path", () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders && workspaceFolders.length > 0) {
            // Get the path of the first workspace folder
            const workspacePath = workspaceFolders[0].uri.fsPath;
            // Display the path in a message box
            vscode.window.showInformationMessage(`opening Path: ${workspacePath}`);
            // open the path in explorer
            vscode.env.openExternal(vscode.Uri.file(workspacePath));
        } else {
            vscode.window.showInformationMessage("No workspace folder found.");
        }
    });

    // 获取当前编辑器的文件路径,并使用系统默认程序打开
    const reveal_file = vscode.commands.registerCommand("some-cmd.reveal_file", async () => {
        // Made the function async
        // 执行命令copyfilepath
        vscode.commands.executeCommand("copyFilePath");
        const read_path = await vscode.env.clipboard.readText(); // Await the promise
        vscode.env.openExternal(vscode.Uri.file(read_path));
    });
    context.subscriptions.push(copy_root_path);
    context.subscriptions.push(reveal_root_path);
    context.subscriptions.push(reveal_file);
    // 设置默认快捷键
}

// This method is called when your extension is deactivated
export function deactivate() {}
