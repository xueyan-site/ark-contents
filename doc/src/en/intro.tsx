import React, { Fragment, useState } from 'react'
import { Contents } from 'xueyan-react-contents'
import type { ContentsOption } from 'xueyan-react-contents'
import { SwitchTheme } from 'xueyan-react-style'
import { LabelLineIcon, ScanIcon } from 'xueyan-react-icon'

const options: ContentsOption<number>[] = [
  {
    label: '选项一',
    value: 1
  },
  {
    label: '选项三',
    value: 2,
    disabled: true
  },
  {
    label: '选项三选项三选项三选项三选项三选项三选项三选项三',
    value: 6,
    disabled: true
  },
  {
    label: '选项四',
    value: 3,
    icon: <ScanIcon/>,
    children: [
      {
        label: 'xxx',
        value: 66,
        icon: <LabelLineIcon/>,
        href: 'https://baidu.com'
      },
      {
        label: '',
        value: 66
      }
    ]
  },
  {
    label: '选项五',
    value: 4
  },
  {
    value: 5,
    label: (
      <Fragment>
        <LabelLineIcon style={{ 
          verticalAlign: 'text-bottom', 
          marginRight: '4px' 
        }}/>
        <span>选项六</span>
      </Fragment>
    )
  }
]

export default function Main() {
  const [opts, setOpts] = useState(options)
  const [value, setValue] = useState<number|undefined>(6)
  const [disabled, setDisabled] = useState<boolean>(false)

  return (
    <div style={{ background: 'var(--base)', padding: '16px' }}>
      <SwitchTheme style={{ marginBottom: '16px' }}/>
      <div 
        style={{ color: 'var(--font)', marginBottom: '16px' }}
        onClick={() => setOpts(opts !== options ? options : [{
          label: '选项五',
          value: 4
        }])}
      >切换</div>
      <div 
        onClick={() => setDisabled(!disabled)}
        style={{ color: 'var(--font)', marginBottom: '16px' }}
      >{disabled ? '解除禁用' : '禁用'}</div>
      <Contents 
        style={{ width: '200px' }}
        value={value}
        options={opts} 
        disabled={disabled}
        onChange={(value, option) => {
          setValue(value)
          console.log(option)
        }}
      />
    </div>
  )
}
