# vsts-extension-printing

This is an Extension for Azure Devops (formerly VSTS) to allow users to print multiple tickets from their backlog to put on a physical board.

## Building the extension

1. Fork and clone the repo
2. Open the terminal pointing to the `code/` folder and run:

```shell
npm install
npm run build
```

When creating the package, the version will be automatically incremented & a new **VSIX** file will be added to the `packages/` folder.

## Uploading extension to the Marketplace

In order to be able to install extensions into your Azure Devops instance, you need to upload the package to the [Visual Studio Marketplace](https://marketplace.visualstudio.com/azuredevops).

Detailed instructions on how to create a publisher account and upload your VSIX can be found at [docs.microsoft.com](https://docs.microsoft.com/en-us/azure/devops/extend/publish/overview?view=azure-devops)

> You can explicitly set the Azure DevOps Organisations who can view your extension, so you don't need to worry about your extension being available to everybody.

## Installing the extension in Azure Devops

Follow [docs.microsoft.com](https://docs.microsoft.com/en-us/azure/devops/extend/publish/overview?view=azure-devops#install) on how to install the extension.

## Printing tickets

The print ticket option is available as a menu option on any of the Work Item Backlog pages, as well as the Work Item Detail page.

From a backlog page, select one or many rows, then click the menu button (three dots) of any one of the selected rows. At the bottom of the context menu that appears, you should see the **Print** option.

From the work item detail page, use the menu button on the far right hand side to find the same option.

## Customising the ticket layout

The layout of the tickets is HTML based, using [HandlebarsJS](https://handlebarsjs.com/) to allow data binding.

### Creating a template

Templates should be added to `code/static/templates/` with a **.handlebars** file extension. Two templates are provided for use, however, only **Template_Card_Simple** is used.

In order for the extension to see your template, it needs to be compiled into JavaScript code. To let Handlebars compile the template, run:

```shell
npm run compile-templates
```

 By using Ahead-of-time compilation for the template, we reduce the time it takes to generate the formatted HTML when the user clicks **Print**.

Properties that can be used within the templates can be found in the `WorkItemFieldKeyConstants` class.

### Using a new template

Once you've written and compiled your new template, you need to update the `CardHtmlBuilder` class to consume it. The template is declared in the `addCard()` method, update the `templateHtml` property within this method with your new template.
