export type EnvironmentRealityStimulus = {
  id: string
  condition: 'environment_real' | 'environment_unreal' | 'neutral'
  textZh: string
  textEn: string
}

export const environmentRealityStimuli: EnvironmentRealityStimulus[] = [
  {
    id: 'er_001',
    condition: 'environment_real',
    textZh: '我周围的环境此刻显得真实而清晰。',
    textEn: 'The environment around me feels real and clear at this moment.',
  },
  {
    id: 'er_002',
    condition: 'environment_real',
    textZh: '我感觉自己正真实地处在这个世界里。',
    textEn: 'I feel that I am genuinely present in this world.',
  },
  {
    id: 'er_003',
    condition: 'environment_unreal',
    textZh: '周围世界像隔着一层膜，不太真实。',
    textEn: 'The world around me feels as if separated by a veil and not fully real.',
  },
  {
    id: 'er_004',
    condition: 'environment_unreal',
    textZh: '我周围的环境有时像梦境或电影场景。',
    textEn: 'My surroundings sometimes feel dreamlike or like a movie scene.',
  },
  {
    id: 'er_005',
    condition: 'neutral',
    textZh: '不同环境会影响一个人的专注程度。',
    textEn: 'Different environments may influence a person’s concentration.',
  },
  {
    id: 'er_006',
    condition: 'neutral',
    textZh: '熟悉和陌生场景可能带来不同主观感受。',
    textEn: 'Familiar and unfamiliar settings may evoke different subjective experiences.',
  },
]
