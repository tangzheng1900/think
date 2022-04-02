import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import cls from 'classnames';
import { Input, Typography, Space } from '@douyinfe/semi-ui';
import { Resizeable } from 'components/resizeable';
import styles from './index.module.scss';

const { Text } = Typography;

export const IframeWrapper = ({ editor, node, updateAttributes }) => {
  const isEditable = editor.isEditable;
  const { url, width, height } = node.attrs;

  const onResize = (size) => {
    updateAttributes({ width: size.width, height: size.height });
  };
  const content = (
    <NodeViewContent as="div" className={cls(styles.wrap, 'render-wrapper')}>
      {/* {isEditable && (
        <div className={styles.handlerWrap}>
          <Input placeholder={'输入外链地址'} value={url} onChange={(url) => updateAttributes({ url })}></Input>
        </div>
      )} */}
      {url ? (
        <div className={styles.innerWrap} style={{ pointerEvents: !isEditable ? 'auto' : 'none' }}>
          <iframe src={url}></iframe>
        </div>
      ) : (
        <div className={styles.emptyWrap}>
          <Text>请设置外链地址</Text>
        </div>
      )}
    </NodeViewContent>
  );

  if (!isEditable && !url) {
    return null;
  }

  return (
    <NodeViewWrapper>
      {isEditable ? (
        <Resizeable height={height} width={width} onChange={onResize}>
          {content}
        </Resizeable>
      ) : (
        <div style={{ width, height, maxWidth: '100%' }}>{content}</div>
      )}
    </NodeViewWrapper>
  );
};
