import { Tree, SchematicContext, Rule } from '@angular-devkit/schematics'
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks'
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies'
import { Schema } from './schema';

const componentLibraries: { [key: string]: string} = {
  'bootstrap' : "4.6.0",
  '@angular/material': '11.2.1'
};

export default function (options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {

      const componentLibrary = options.componentLibrary;
      const componentLibraryDependency: NodeDependency = _nodeDependencyFactory(componentLibrary, componentLibraries[componentLibrary]);

      addPackageJsonDependency(tree, componentLibraryDependency);

      context.addTask(new NodePackageInstallTask());

    };
}

function _nodeDependencyFactory(packageName: string, version: string): NodeDependency {
  return {
    type: NodeDependencyType.Default,
    name: packageName,
    version: version,
    overwrite: true
  }
}