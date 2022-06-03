import React, { Fragment, useState } from 'react'
import { Article, Segment } from 'xueyan-react-markdown'
import { Playground } from 'xueyan-react-playground'
import { LabelLineIcon, ScanIcon } from 'xueyan-react-icon'
import { Contents } from 'xueyan-react-contents'

const MARK1 = `
目录工具包，专用于书籍、文档、后台菜单等处。

## 示例
`

const code1 = `
import React, { Fragment, useState } from 'react'
import { Contents } from 'xueyan-react-contents'
import { LabelLineIcon, ScanIcon } from 'xueyan-react-icon'
import type { ContentsOption } from 'xueyan-react-contents'

const options: ContentsOption<number>[] = [
  {
    value: 1,
    label: '选项一',
    icon: <ScanIcon/>
  },
  {
    value: 2,
    label: '选项二',
    disabled: true
  },
  {
    value: 3,
    label: '选项三选项三选项三选项三选项三选项三选项三选项三',
    disabled: true
  },
  {
    value: 4,
    label: '选项四',
    children: [
      {
        value: 41,
        label: '子选项一',
        icon: <LabelLineIcon/>
      },
      {
        value: 42,
        label: '子选项二',
      }
    ]
  }
]

export default function Main() {
  const [value, setValue] = useState<number>(41)
  const [disabled, setDisabled] = useState<boolean>(false)
  return (
    <Fragment>
      <div onClick={() => setDisabled(!disabled)}>
        {disabled ? '解除禁用' : '禁用'}
      </div>
      <Contents
        value={value}
        options={options} 
        disabled={disabled}
        style={{ 
          width: '200px',
          marginTop: '16px'
        }}
        onChange={(value, option) => {
          setValue(value)
          console.log(option)
        }}
      />
    </Fragment>
  )
}
`

export default function Main() {
  const scope = {
    React, Contents, LabelLineIcon, 
    ScanIcon, Fragment, useState
  }
  return (
    <Article>
      <Segment>{MARK1}</Segment>
      <Playground scope={scope}>
        {code1}
      </Playground>
    </Article>
  )
}
