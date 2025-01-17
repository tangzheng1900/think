import { IconCopy, IconDelete } from '@douyinfe/semi-icons';
import { Button, Space } from '@douyinfe/semi-ui';
import { Tooltip } from 'components/tooltip';
import React, { useCallback } from 'react';
import { Divider } from 'tiptap/components/divider';
import { CodeBlock } from 'tiptap/core/extensions/code-block';
import { BubbleMenu } from 'tiptap/editor/views/bubble-menu';
import { copyNode, deleteNode } from 'tiptap/prose-utils';

export const CodeBlockBubbleMenu = ({ editor }) => {
  const shouldShow = useCallback(() => editor.isActive(CodeBlock.name), [editor]);
  const getRenderContainer = useCallback((node) => {
    let container = node;

    // 文本节点
    if (!container.tag) {
      container = node.parentElement;
    }

    while (container && container.classList && !container.classList.contains('node-codeBlock')) {
      container = container.parentElement;
    }

    return container;
  }, []);
  const copyMe = useCallback(() => copyNode(CodeBlock.name, editor), [editor]);
  const deleteMe = useCallback(() => deleteNode(CodeBlock.name, editor), [editor]);

  return (
    <BubbleMenu
      className={'bubble-menu'}
      editor={editor}
      pluginKey="code-block-bubble-menu"
      shouldShow={shouldShow}
      tippyOptions={{ maxWidth: 'calc(100vw - 100px)' }}
      getRenderContainer={getRenderContainer}
    >
      <Space spacing={4}>
        <Tooltip content="复制">
          <Button onClick={copyMe} icon={<IconCopy />} type="tertiary" theme="borderless" size="small" />
        </Tooltip>

        <Divider />

        <Tooltip content="删除节点" hideOnClick>
          <Button onClick={deleteMe} icon={<IconDelete />} type="tertiary" theme="borderless" size="small" />
        </Tooltip>
      </Space>
    </BubbleMenu>
  );
};
