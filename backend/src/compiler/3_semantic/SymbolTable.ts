export class SymbolTable {
  private scopes: Map<string, string>[] = [new Map()];

  public enterScope(): void {
    this.scopes.push(new Map());
  }

  public exitScope(): void {
    if (this.scopes.length > 1) {
      this.scopes.pop();
    } else {
      throw new Error("CannotPopGlobalScope");
    }
  }

  public define(name: string, type: string): void {
    const currentScope = this.scopes[this.scopes.length - 1];
    if (currentScope.has(name)) {
      throw new Error(`VariableAlreadyDefined:${name}`);
    }
    currentScope.set(name, type);
  }

  public resolve(name: string): string | null {
    for (let i = this.scopes.length - 1; i >= 0; i--) {
      if (this.scopes[i].has(name)) {
        return this.scopes[i].get(name)!;
      }
    }
    return null;
  }
}