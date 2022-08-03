const Die = (props) => {
    const styles = {
        backgroundColor: props.isHeld ? '#59E391' : '#FFFFFF'
    }
    
    return ( 
        <div>
            <div className="die-face" style={styles} onClick={props.holdDice}>
                <h3>{props.value}</h3>
            </div>
        </div>
     );
}
 
export default Die;