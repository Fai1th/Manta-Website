const filters=[...document.querySelectorAll('[data-filter]')];
const commands=[...document.querySelectorAll('[data-command]')];
const query=document.querySelector('#command-query');
let category='all';
function filterCommands(){
  const text=query.value.trim().toLowerCase();
  let count=0;
  for(const command of commands){
    const visible=(category==='all'||command.dataset.category===category)&&command.textContent.toLowerCase().includes(text);
    command.hidden=!visible;
    if(visible)count++;
  }
  document.querySelector('#command-empty').hidden=count>0;
  document.querySelector('#command-count').textContent=`${count} command${count===1?'':'s'} shown.`;
}
for(const filter of filters)filter.addEventListener('click',()=>{
  category=filter.dataset.filter;
  for(const button of filters)button.setAttribute('aria-pressed',String(button===filter));
  filterCommands();
});
query.addEventListener('input',filterCommands);
