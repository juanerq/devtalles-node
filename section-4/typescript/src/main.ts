
type ChannelType = {
  LLAMADA: 'OUTBOUND' | 'INBOUND',
  CHAT: 'WHATSAPP'
}

type ChannelTypeKey = keyof ChannelType;
type ChannelTypeValue = { [key in ChannelTypeKey]: ChannelType[key][] }

const channels: ChannelTypeValue = {
  LLAMADA: ['OUTBOUND', 'INBOUND'],
  CHAT: ['WHATSAPP']
}

type ChannelObjType<c extends ChannelTypeKey> = {
  channel: c,
  type: ChannelType[c][]
}


export function getChannel<c extends ChannelTypeKey>(channel: c): ChannelObjType<c> {
  return {
    channel,
    type: channels[channel]
  }
}

