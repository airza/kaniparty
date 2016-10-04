function getParameterByName(name, url) {
   if (!url) url = window.location.href;
   name = name.replace(/[\[\]]/g, "\\$&");
   var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
   if (!results) return null;
   if (!results[2]) return '';
   return decodeURIComponent(results[2].replace(/\+/g, " "));
}
var api_key = getParameterByName('api_key');
var Vocab = React.createClass({
   render: function(){
      return (
         <div className='vocab'>
            <h1 className='character'>
            {this.props.character}
            </h1>
            <p className='kana'>{this.props.kana}
            </p>
            <p className='meaning'>
            {this.props.meaning}
            </p>
            </div>
      )
   }
})
var FilterBox = React.createClass({
   render: function(){
      return (
         <p><input type='text' placeholder='フィルター' onChange={this.props.onInput} /></p>
      )
   },
});
var VocabList = React.createClass({
   isVisible: function(el){
      var st =el.kana+el.meaning+el.character;
      return st.indexOf(this.state.filterText)>=0; 
   },
   render: function(){
      var filteredList = this.state.list.map(function(e,i){
         var ee = e;
         ee['key'] = i;
         return ee;
      }).filter(this.isVisible);
      return (
         <div>
            <FilterBox onInput={this.setFilterText} />
            {
               filteredList.map(function(e,i){
                  return (<Vocab key={e.key} kana={e.kana} meaning={e.meaning} character={e.character} />)
               })
            }

            </div>
      );
   },
   setFilterText: function(e){
      var t = e.target.value;
      this.setState({filterText:t});
   },
   getInitialState: function() {
      return {list: this.props.chars, filterText:''};
   },
   addItems: function(){
      this.state
   }
});
ReactDOM.render(
   <VocabList chars={data} />,
   document.getElementById('content')
);
