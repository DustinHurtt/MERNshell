const Input = ({ name, value, onChange, key }) => {


  
    return (


        <input 
        key={key}
        name={name} type="text"
        value={value}
        //  placeholder="search items..." 
         onChange={onChange} 
        //  autoFocus

         />
       

    
    );
  }
  
  export default Input;
  