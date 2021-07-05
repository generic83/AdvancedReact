import classes from './Input.module.css';

const Input = (props) => {
    return (
        <div
            className={`${classes.control} 
            ${props.isValid === false ? classes.invalid : ''}`}>
            <label htmlFor={props.id}>{props.label}</label>
            <input
                id={props.id}
                type={props.type}
                value={props.value}
                onChange={props.onChangeHandler}
                onBlur={props.onBlurHandler} />
        </div>
    )
}

export default Input;