'use strict';

class PathGenerator {

  // different parsers have different AST specs
  static get propNames() {
    return {
      textContent: 'value',
      childNodes: 'childNodes',
      attributes: 'attrs',
      attributeName: 'name',
      attributeValue: 'value',
      nodeName: 'nodeName'
    };
  }

  /**
   * @param {object} node - node to collect props from
   * @returns {object} - attributes, nodeName, siblingIndex, textContent
   */

  static collectProps(node, props) {
    const { nodeName, textContent, attributes } = PathGenerator.propNames;
    const data = {
      nodeName: node[nodeName],
      textContent: node[textContent],
      attributes: (node[attributes] || []).map(attr => {
        const { attributeName, attributeValue } = PathGenerator.propNames;
        return {
          [attributeName]: attr[attributeName],
          [attributeValue]: attr[attributeValue]
        };
      })
    };
    return props ? Object.assign({}, data, props) : data;
  }

  /**
   * constructor manages state of traversal
   * @param {function} filter - callback on every node, if returns true, stop walking
   * @param {ast} object - html AST
   * @param {boolean} accumulate - if true, push results of true filter return into accumulator
   */

  constructor(filter, ast, shouldAccumulate) {
    this.shouldAccumulate = shouldAccumulate;
    this.filter = filter;
    this.ast = ast;
    return this.traverse(ast);
  }

  /**
   * BFS through AST until filter is satisfied, returns path
   * @param {object} node - node of current call
   * @param {siblingIndex} number - index of node in sibling array
   * @param {object} parentNode - node from previous call
   * @param {array<props>} path - recusively accumulated path
   */

  traverse(node, siblingIndex = 0, parentNode = {}, currentPath = [], acc = []) {
    const props = PathGenerator.collectProps(node, {siblingIndex});
    const children = node[PathGenerator.propNames.childNodes];
    const result = this.filter(props);
    if (result === true) {
      if (this.shouldAccumulate === true) {
        return acc.concat([...currentPath, props]);
      } else {
        return [...currentPath, props];
      }
    }
    if (children) {
      return children.reduce((bucket, child, i) => {
        const branch = this.traverse(child, i, node, [...currentPath, props], bucket);
        return branch ? branch : bucket;
      }, acc);
    } else {
      return;
    }
  }

}

module.exports = PathGenerator;
