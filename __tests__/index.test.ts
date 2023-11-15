import {
  log,
  time,
  info,
  error,
  done,
  warn,
  symbols,
  colors,
  tag,
  timestamp
} from '../index'

describe('time', () => {
  it('should return the current timestamp', () => {
    expect(timestamp('HH:mm:ss')).toBeTruthy()
  })

  it('should log the given arguments with a timestamp prefix', () => {
    const stdoutSpy = jest.spyOn(process.stdout, 'write')
    const consoleSpy = jest.spyOn(console, 'log')
    const mockedTimestamp = timestamp('HH:mm:ss')

    time('Hello', 'World')
    expect(stdoutSpy).toHaveBeenCalledWith(`[${colors.gray(mockedTimestamp)}] `)
    expect(consoleSpy).toHaveBeenCalledWith('Hello', 'World')

    stdoutSpy.mockRestore()
    consoleSpy.mockRestore()
  })
})

describe('Symbols', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should log the given arguments', () => {
    const logSpy = jest.spyOn(console, 'log')

    log('Hello', 'World')
    expect(logSpy).toHaveBeenCalledWith('Hello', 'World')

    logSpy.mockRestore()
  })

  it('should log the given arguments with a symbol prefix', () => {
    const stdoutSpy = jest.spyOn(process.stdout, 'write')
    const infoSpy = jest.spyOn(console, 'info')
    const doneSpy = jest.spyOn(console, 'log')
    const warnSpy = jest.spyOn(console, 'warn')
    const errorSpy = jest.spyOn(console, 'error')

    info('Hello', 'World')
    expect(stdoutSpy).toHaveBeenCalledWith(`${symbols.info} `)
    expect(infoSpy).toHaveBeenCalledWith('Hello', 'World')

    done('Hello', 'World')
    expect(stdoutSpy).toHaveBeenCalledWith(`${symbols.done} `)
    expect(doneSpy).toHaveBeenCalledWith('Hello', 'World')

    warn('Hello', 'World')
    expect(stdoutSpy).toHaveBeenCalledWith(`${symbols.warn} `)
    expect(warnSpy).toHaveBeenCalledWith('Hello', 'World')

    error('Hello', 'World')
    expect(stdoutSpy).toHaveBeenCalledWith(`${symbols.error} `)
    expect(errorSpy).toHaveBeenCalledWith('Hello', 'World')

    stdoutSpy.mockRestore()
    infoSpy.mockRestore()
    doneSpy.mockRestore()
    warnSpy.mockRestore()
    errorSpy.mockRestore()
  })
})

describe('tags', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should log the given message with the default tag and label', () => {
    const tagSpy = jest.spyOn(console, 'info')
    tag('Hello')
    expect(tagSpy).toHaveBeenCalledWith(colors.bgBlue(colors.black(' INFO ')), 'Hello')
    tagSpy.mockRestore()
  })

  it('should log the given message with the specified tag and label', () => {
    const tagSpy = jest.spyOn(console, 'error')
    tag('Hello', 'error', 'failed')
    expect(tagSpy).toHaveBeenCalledWith(colors.bgRed(colors.black(' failed ')), colors.red('Hello'))
    tagSpy.mockRestore()
  })

  it('should log the correct message with tag type', () => {
    const infoSpy = jest.spyOn(console, 'info')
    const doneSpy = jest.spyOn(console, 'log')
    const warnSpy = jest.spyOn(console, 'warn')
    const errorSpy = jest.spyOn(console, 'error')

    tag.info('Hello')
    expect(infoSpy).toHaveBeenCalledWith(colors.bgBlue(colors.black(' INFO ')), 'Hello')

    tag.done('Hello')
    expect(doneSpy).toHaveBeenCalledWith(colors.bgGreen(colors.black(' DONE ')), 'Hello')
    tag.done('Hello', 'success')
    expect(doneSpy).toHaveBeenCalledWith(colors.bgGreen(colors.black(' success ')), 'Hello')

    tag.warn('Hello')
    expect(warnSpy).toHaveBeenCalledWith(colors.bgYellow(colors.black(' WARN ')), colors.yellow('Hello'))

    tag.error('Hello')
    expect(errorSpy).toHaveBeenCalledWith(colors.bgRed(colors.black(' ERROR ')), colors.red('Hello'))
    
    infoSpy.mockRestore()
    doneSpy.mockRestore()
    warnSpy.mockRestore()
    errorSpy.mockRestore()
  })
})
