const { useState } = React;
const styled = window.styled.default;

const FormContainer = styled.form`
    background: ${props => props.theme.colors.surface};
    border: 2px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.lg};
    padding: ${props => props.theme.spacing['2xl']};
    max-width: 400px;
    width: 100%;
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, ${props => props.theme.colors.secondary}, ${props => props.theme.colors.accent});
        border-radius: ${props => props.theme.borderRadius.lg} ${props => props.theme.borderRadius.lg} 0 0;
    }
`;

const FormTitle = styled.h2`
    text-align: center;
    margin-bottom: ${props => props.theme.spacing.xl};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${props => props.theme.spacing.md};
`;

const FormGroup = styled.div`
    margin-bottom: ${props => props.theme.spacing.lg};
`;

const Label = styled.label`
    display: block;
    margin-bottom: ${props => props.theme.spacing.sm};
    color: ${props => props.theme.colors.text};
    font-weight: ${props => props.theme.fonts.weights.medium};
    font-size: ${props => props.theme.fonts.sizes.sm};
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

const Input = styled.input`
    width: 100%;
    background: ${props => props.theme.colors.background};
    border: 2px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.md};
    padding: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.fonts.sizes.md};
    font-family: ${props => props.theme.fonts.body};
    transition: all 0.3s ease;
    
    &::placeholder {
        color: ${props => props.theme.colors.textMuted};
        font-style: italic;
    }
    
    &:focus {
        border-color: ${props => props.theme.colors.secondary};
        box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
        outline: none;
    }
    
    &:hover:not(:focus) {
        border-color: ${props => props.theme.colors.accent};
    }
    
    ${props => props.error && `
        border-color: ${props.theme.colors.error};
        
        &:focus {
            box-shadow: 0 0 0 3px rgba(220, 20, 60, 0.1);
        }
    `}
`;

const ErrorMessage = styled.div`
    color: ${props => props.theme.colors.error};
    font-size: ${props => props.theme.fonts.sizes.sm};
    margin-top: ${props => props.theme.spacing.xs};
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.xs};
`;

const FormActions = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.spacing.md};
    margin-top: ${props => props.theme.spacing.xl};
`;

const ForgotPassword = styled.a`
    text-align: center;
    font-size: ${props => props.theme.fonts.sizes.sm};
    color: ${props => props.theme.colors.textMuted};
    
    &:hover {
        color: ${props => props.theme.colors.secondary};
    }
`;

const Divider = styled.div`
    display: flex;
    align-items: center;
    margin: ${props => props.theme.spacing.lg} 0;
    
    &::before,
    &::after {
        content: '';
        flex: 1;
        height: 1px;
        background: ${props => props.theme.colors.border};
    }
    
    span {
        padding: 0 ${props => props.theme.spacing.md};
        color: ${props => props.theme.colors.textMuted};
        font-size: ${props => props.theme.fonts.sizes.sm};
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }
`;

const LoginForm = ({
    onSubmit,
    onForgotPassword,
    onSignUp,
    loading = false,
    ...props
}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm() && onSubmit) {
            onSubmit(formData);
        }
    };

    return React.createElement(FormContainer, { onSubmit: handleSubmit, ...props },
        React.createElement(FormTitle, null,
            React.createElement(Icons.Shield, { size: 24 }),
            'Enter the Realm'
        ),
        
        React.createElement(FormGroup, null,
            React.createElement(Label, { htmlFor: 'email' }, 'Email Address'),
            React.createElement(Input, {
                id: 'email',
                name: 'email',
                type: 'email',
                placeholder: 'adventurer@realm.com',
                value: formData.email,
                onChange: handleChange,
                error: !!errors.email
            }),
            errors.email && React.createElement(ErrorMessage, null,
                React.createElement('i', { className: 'fas fa-exclamation-triangle' }),
                errors.email
            )
        ),
        
        React.createElement(FormGroup, null,
            React.createElement(Label, { htmlFor: 'password' }, 'Password'),
            React.createElement(Input, {
                id: 'password',
                name: 'password',
                type: 'password',
                placeholder: 'Enter your secret passphrase',
                value: formData.password,
                onChange: handleChange,
                error: !!errors.password
            }),
            errors.password && React.createElement(ErrorMessage, null,
                React.createElement('i', { className: 'fas fa-exclamation-triangle' }),
                errors.password
            )
        ),
        
        React.createElement(FormActions, null,
            React.createElement(PrimaryButton, {
                type: 'submit',
                fullWidth: true,
                disabled: loading,
                icon: Icons.Sword
            }, loading ? 'Entering...' : 'Enter Realm'),
            
            onForgotPassword && React.createElement(ForgotPassword, {
                href: '#',
                onClick: (e) => {
                    e.preventDefault();
                    onForgotPassword();
                }
            }, 'Forgot your passphrase?'),
            
            onSignUp && React.createElement(React.Fragment, null,
                React.createElement(Divider, null,
                    React.createElement('span', null, 'or')
                ),
                React.createElement(SecondaryButton, {
                    type: 'button',
                    fullWidth: true,
                    icon: Icons.Crown,
                    onClick: onSignUp
                }, 'Join the Adventure')
            )
        )
    );
};

window.LoginForm = LoginForm;
