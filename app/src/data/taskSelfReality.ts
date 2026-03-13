export type SelfRealityStimulus = {
  id: string
  condition: 'self_real' | 'self_alienated' | 'neutral'
  textZh: string
  textEn: string
}

export const selfRealityStimuli: SelfRealityStimulus[] = [
  {
    id: 'sr_001',
    condition: 'self_real',
    textZh: '此刻的我是真实而连续的。',
    textEn: 'At this moment, I feel real and continuous as a person.',
  },
  {
    id: 'sr_002',
    condition: 'self_real',
    textZh: '我感觉自己的想法属于我自己。',
    textEn: 'I feel that my thoughts belong to me.',
  },
  {
    id: 'sr_003',
    condition: 'self_alienated',
    textZh: '我像在旁观自己，而不是在真正经历生活。',
    textEn: 'I feel as if I am observing myself rather than truly living.',
  },
  {
    id: 'sr_004',
    condition: 'self_alienated',
    textZh: '我感觉自己和自己之间隔着一层东西。',
    textEn: 'I feel as if something separates me from myself.',
  },
  {
    id: 'sr_005',
    condition: 'neutral',
    textZh: '今天的天气可能会影响人的状态。',
    textEn: 'Today’s weather may influence a person’s state.',
  },
  {
    id: 'sr_006',
    condition: 'neutral',
    textZh: '人在不同环境中的专注程度可能不同。',
    textEn: 'People may concentrate differently in different environments.',
  },
]
