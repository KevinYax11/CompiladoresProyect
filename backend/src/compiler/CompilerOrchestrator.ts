import { FlowchartGraph } from '../../../shared/src/types/flowchart';
import { FlowValidator } from './0_graph_analyzer/FlowValidator';
import { GraphToAST } from './0_graph_analyzer/GraphToAST';
import { TypeChecker } from './3_semantic/TypeChecker';
import { ConstantFolding } from './4_optimizer/ConstantFolding';
import { DeadCodeRemoval } from './4_optimizer/DeadCodeRemoval';
import { PythonGenerator } from './5_codegen/PythonGenerator';
import { NasmX86_64Generator } from './5_codegen/NasmX86_64Generator';
import { CppGenerator } from './5_codegen/CppGenerator';
import { JavaGenerator } from './5_codegen/JavaGenerator';
import { JavascriptGenerator } from './5_codegen/JavascriptGenerator';
import { RubyGenerator } from './5_codegen/RubyGenerator';
import { Logger } from '../utils/Logger';
import { ErrorHandler } from '../utils/ErrorHandler';

export const compileGraph = (graph: FlowchartGraph) => {
  try {
    Logger.info('Starting compilation process', { nodeCount: graph.nodes.length });

    const validator = new FlowValidator();
    validator.validate(graph);
    Logger.info('Graph validation passed');

    const astBuilder = new GraphToAST(graph);
    let ast = astBuilder.buildAST();
    Logger.info('AST generated from graph');

    const typeChecker = new TypeChecker();
    typeChecker.check(ast);
    Logger.info('Semantic analysis passed');

    const constantFolder = new ConstantFolding();
    ast = constantFolder.optimize(ast);
    
    const deadCodeRemover = new DeadCodeRemoval();
    ast = deadCodeRemover.optimize(ast);
    Logger.info('AST optimizations applied');

    const pythonGen = new PythonGenerator();
    const asmGen = new NasmX86_64Generator();
    const cppGen = new CppGenerator();
    const javaGen = new JavaGenerator();
    const jsGen = new JavascriptGenerator();
    const rubyGen = new RubyGenerator();

    const result = {
      ast,
      code: {
        python: pythonGen.generate(ast),
        nasm: asmGen.generate(ast),
        cpp: cppGen.generate(ast),
        java: javaGen.generate(ast),
        javascript: jsGen.generate(ast),
        ruby: rubyGen.generate(ast)
      }
    };

    Logger.info('Code generation completed successfully');
    return result;

  } catch (error) {
    Logger.error('Compilation failed', error);
    throw ErrorHandler.formatError(error);
  }
};