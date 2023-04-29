interface AlertProps {
    message: string;
    type?: string;
  }
  
  const Alert: React.FC<AlertProps> = ({ message, type }) => {
    return (
      <div style={{ backgroundColor: type === 'error' ? '#f44336' : type === 'warning' ? '#ff9800' : '#4caf50', color: '#fff', padding: '10px', marginTop: '20px'}}>
        {message}
      </div>
    );
  }
  
  export default Alert;