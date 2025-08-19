import { screen } from '@testing-library/react'
import { describe, it } from 'vitest'
import { trans } from '../../../config/i18n'
import { renderAppWithRoute } from '../../helpers'
import { setLang } from '../../../redux/config.slice'
import Index from '../../../pages/Index'
describe('App', () => {
  it('should work as expected', () => {
    renderAppWithRoute('/login')
    expect(screen.getByText(trans('label.loginAdmin'))).toBeInTheDocument()
  })

  it('should show the correct number of studied words', () => {
    const initialState = {
      configApp: {
        words: [],
        studiedHashWords: ['1', '2'],
        configTrain: {
          studyEnglishToSpanish: false,
          studyRandomMode: false,
          studyAutomatic: false,
          velocityStudyAutomatic: 1
        },
        orderTypeEstablished: '',
        canSyncWords: false,
        lang: 'es'
      }
    }
    const { store, rerender } = renderAppWithRoute(<Index />, initialState)

    expect(screen.getByText('Total de estudiadas: 2')).toBeInTheDocument()
    store.dispatch(setLang('en'))
    rerender(<Index />)
    expect(screen.getByText('Number studied: 2')).toBeInTheDocument()
  })
})
