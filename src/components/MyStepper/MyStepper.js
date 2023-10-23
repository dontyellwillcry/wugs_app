import React from 'react';
import { styled } from '@mui/material/styles';
import { withRouter } from 'react-router-dom';
import { Step, StepLabel, Stepper } from '@mui/material/'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import PropTypes from 'prop-types';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import KitchenIcon from '@mui/icons-material/Kitchen';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import FeedIcon from '@mui/icons-material/Feed';
import FactCheckIcon from '@mui/icons-material/FactCheck';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg, #050c42 25%, #f3cf2a 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,#050c42 0%,#050c42 50%,#050c42 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#fff',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: //current step
      'linear-gradient( 136deg, #f3cf2a 0%, #f3cf2a 50%, #050c42 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: //Completed Steps styling
      'linear-gradient( 136deg, #f3cf2a 0%, #050c42 50%, #050c42 100%)',
  }),
  ...(!ownerState.active && !ownerState.completed && {
    backgroundColor: '#fefefe', // Changes the background color of future steps
    color: '#050c42', // Changes the text color of future steps
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <KitchenIcon />,
    2: <MapsHomeWorkIcon />,
    3: <Diversity3Icon />,
    4: <LunchDiningIcon />,
    5: <FeedIcon />,
    6: <FactCheckIcon />


  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = ['Services', 'Location Info', 'About Your Community', 'Food Choices', 'Additional Info', 'Review and Complete!']
const stepRoutes = ['/servicechoice', '/clientlocationinfo', '/demographics', '/foodpreferences', '/additionalinfo', '/review'];

function MyStepper(props) {

  const { step, history } = props;

  const handleStepClick = (stepIndex) => {
    history.push(stepRoutes[stepIndex]);
  };

  return (


    <div>

      <Stepper alternativeLabel activeStep={step} connector={<ColorlibConnector />}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              className="custom-step-label"
              StepIconComponent={ColorlibStepIcon}
              onClick={() => handleStepClick(index)}
              sx={{
                "& .MuiStepLabel-label.MuiStepLabel-alternativeLabel": {
                  color: "beige"
                },
                "& .MuiStepLabel-label.Mui-completed": {
                  color: "#beige"
                },

                "& .MuiStepLabel-label.Mui-active": {
                  color: "#f3cf2a",
                },

              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

export default withRouter(MyStepper);