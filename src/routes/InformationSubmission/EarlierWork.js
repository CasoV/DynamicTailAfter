import React from 'react';
import {Tree} from 'antd';
import {connect} from 'dva/index'

const TreeNode = Tree.TreeNode;

@connect(({earlierWork}) => {
  earlierWork
})

export default class EarlierWork extends React.Component {
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }

  render() {
    return (
      <div style={{display: 'row', flexDirection: 'row'}}>
        <div style={{width: '20%', backgroundColor:'white'}}>
          <Tree
            showLine
            defaultExpandedKeys={['0-0-0']}
            onSelect={this.onSelect}>
            <TreeNode title="parent 1" key="0-0">
              <TreeNode title="parent 1-0" key="0-0-0">
                <TreeNode title="leaf" key="0-0-0-0"/>
                <TreeNode title="leaf" key="0-0-0-1"/>
                <TreeNode title="leaf" key="0-0-0-2"/>
              </TreeNode>
              <TreeNode title="parent 1-1" key="0-0-1">
                <TreeNode title="leaf" key="0-0-1-0"/>
              </TreeNode>
              <TreeNode title="parent 1-2" key="0-0-2">
                <TreeNode title="leaf" key="0-0-2-0"/>
                <TreeNode title="leaf" key="0-0-2-1"/>
              </TreeNode>
            </TreeNode>
            <TreeNode title="parent 1" key="0-0">
              <TreeNode title="parent 1-0" key="0-0-0">
                <TreeNode title="leaf" key="0-0-0-0"/>
                <TreeNode title="leaf" key="0-0-0-1"/>
                <TreeNode title="leaf" key="0-0-0-2"/>
              </TreeNode>
              <TreeNode title="parent 1-1" key="0-0-1">
                <TreeNode title="leaf" key="0-0-1-0"/>
              </TreeNode>
              <TreeNode title="parent 1-2" key="0-0-2">
                <TreeNode title="leaf" key="0-0-2-0"/>
                <TreeNode title="leaf" key="0-0-2-1"/>
              </TreeNode>
            </TreeNode>
            <TreeNode title="parent 1" key="0-0">
              <TreeNode title="parent 1-0" key="0-0-0">
                <TreeNode title="leaf" key="0-0-0-0"/>
                <TreeNode title="leaf" key="0-0-0-1"/>
                <TreeNode title="leaf" key="0-0-0-2"/>
              </TreeNode>
              <TreeNode title="parent 1-1" key="0-0-1">
                <TreeNode title="leaf" key="0-0-1-0"/>
              </TreeNode>
              <TreeNode title="parent 1-2" key="0-0-2">
                <TreeNode title="leaf" key="0-0-2-0"/>
                <TreeNode title="leaf" key="0-0-2-1"/>
              </TreeNode>
            </TreeNode>
            <TreeNode title="parent 1" key="0-0">
              <TreeNode title="parent 1-0" key="0-0-0">
                <TreeNode title="leaf" key="0-0-0-0"/>
                <TreeNode title="leaf" key="0-0-0-1"/>
                <TreeNode title="leaf" key="0-0-0-2"/>
              </TreeNode>
              <TreeNode title="parent 1-1" key="0-0-1">
                <TreeNode title="leaf" key="0-0-1-0"/>
              </TreeNode>
              <TreeNode title="parent 1-2" key="0-0-2">
                <TreeNode title="leaf" key="0-0-2-0"/>
                <TreeNode title="leaf" key="0-0-2-1"/>
              </TreeNode>
            </TreeNode>
            <TreeNode title="parent 1" key="0-0">
              <TreeNode title="parent 1-0" key="0-0-0">
                <TreeNode title="leaf" key="0-0-0-0"/>
                <TreeNode title="leaf" key="0-0-0-1"/>
                <TreeNode title="leaf" key="0-0-0-2"/>
              </TreeNode>
              <TreeNode title="parent 1-1" key="0-0-1">
                <TreeNode title="leaf" key="0-0-1-0"/>
              </TreeNode>
              <TreeNode title="parent 1-2" key="0-0-2">
                <TreeNode title="leaf" key="0-0-2-0"/>
                <TreeNode title="leaf" key="0-0-2-1"/>
              </TreeNode>
            </TreeNode>
          </Tree>
        </div>
        <div style={{width: '80%'}}></div>


      </div>
    );
  }
}
