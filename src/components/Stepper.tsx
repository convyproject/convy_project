import React from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Stepper, { StepperProps } from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Typography from '@mui/material/Typography'

type Props = {
  data: {
    label: string
    description: any
  }[]
  orientation?: 'vertical' | 'horizontal'
  stepperProps?: StepperProps
}

const StepperCustom = (props: Props) => {
  const { data, stepperProps, orientation = 'horizontal' } = props

  return (
    <Box style={{ maxWidth: 250 }}>
      <Stepper orientation={orientation} {...stepperProps}>
        {data.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              {typeof step.description === 'string' ? (
                <Typography>{step.description}</Typography>
              ) : (
                step.description() || ''
              )}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}

export default StepperCustom
