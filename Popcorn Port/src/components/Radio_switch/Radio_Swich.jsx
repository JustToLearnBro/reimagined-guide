import './Radio.css'
const Radio_Swich = ({sortBy, handleSort}) => {
  return (
    <div className="radio-inputs">
  <label className="radio">
    <input type="radio" name="radio" checked={sortBy === 'popularity' || sortBy === ''} onChange={()=>{handleSort('popularity')}}/>
    <span className="name">Popularity</span>
  </label>
  <label className="radio">
    <input type="radio" name="radio" checked={sortBy === 'date' } onChange={()=>{handleSort('date')}}/>
    <span className="name">Date</span>
  </label>
      
  <label className="radio">
    <input type="radio" name="radio" checked={sortBy === 'rating'} onChange={()=>{handleSort('rating')}}/>
    <span className="name">Rating</span>
  </label>
</div>
  )
}

export default Radio_Swich