import { useDispatch } from 'react-redux';
import { loginThunk } from 'redux/Auth/authOperations';
import * as Yup from 'yup';
import {
  StyledForm,
  StyledFormInsight,
  StyledTitle,
  StyledLabel,
  StyledInput,
  StyledButton,
  StyledError,
  StyledInputWrap,
  StyledIconError,
  StyledIconChecked,
} from './LoginFormStyled';
import { FiLogIn } from 'react-icons/fi';




const LoginForm = () => {
  const dispatch = useDispatch();
  // const isLoggedIn = useSelector(selectIsLoggedIn)
  
 
  return (
    <StyledForm
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Invalid email address')
          .required('Required'),
        password: Yup.string()
        .required('No password provided.') 
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
      })}
      onSubmit={(values) => {
        console.log(values);
        dispatch(loginThunk(values));
        
      }}
      
    >
      
      {formik => (
        
        <StyledFormInsight>
          {/* <pre>{JSON.stringify(formik, null, 2)}</pre> */}
          <StyledTitle>Log In</StyledTitle>
          <StyledLabel>Email</StyledLabel>
          <StyledInputWrap>
          <StyledInput type="email" name="email" placeholder="Your e-mail..." />
          {(formik.errors.email && formik.touched.email) && <StyledIconError  color='red'/>} 
          {(formik.touched.email && !formik.errors.email) && <StyledIconChecked color='green'/>}
          <StyledIconError  color='red' display='none'/>
          </StyledInputWrap>
          <StyledError name="email" component="div"/>
          <StyledLabel>Password</StyledLabel>
          <StyledInputWrap>
          <StyledInput type="password" name="password" placeholder="......." />
          {(formik.errors.password && formik.touched.password) && <StyledIconError  color='red'/>}
          {(formik.touched.password && !formik.errors.password) && <StyledIconChecked color='green'/>}
          </StyledInputWrap>
          <StyledError name="password" component="div" />
          <StyledButton type="submit">Log In <FiLogIn />
          </StyledButton>
        </StyledFormInsight>
      )}
    </StyledForm>
  );
};

export default LoginForm;
