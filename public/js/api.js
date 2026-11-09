export async function api(url,options={}){const res=await fetch(url,{headers:{'Content-Type':'application/json',...(options.headers||{})},...options});const data=await res.json().catch(()=>({message:'Invalid server response'}));if(!res.ok)throw new Error(data.message||`Request failed (${res.status})`);return data;}
export function getStudent(){try{return JSON.parse(sessionStorage.getItem('ledgerStudent')||'null')}catch{return null}}
export function requireStudent(){const s=getStudent();if(!s){location.href='/login.html';throw new Error('Please sign in first')}document.querySelectorAll('[data-nav]').forEach(a=>a.classList.toggle('active',a.dataset.nav===document.body.dataset.page));const p=document.getElementById('sidebarProfile');if(p)p.innerHTML=`${escapeHtml(s.name)}<small>${escapeHtml(s.studentId)}</small>`;document.getElementById('logoutBtn')?.addEventListener('click',()=>{sessionStorage.removeItem('ledgerStudent');location.href='/login.html'});return s}
export function escapeHtml(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
export function grade(t){return t>=90?'A+':t>=80?'A':t>=70?'B+':t>=60?'B':t>=50?'C':t>=40?'D':'F'}
export function gp(t){return t>=90?10:t>=80?9:t>=70?8:t>=60?7:t>=50?6:t>=40?5:0}
export function status(t,a){return t<40?'Fail':a<75?'Attendance Risk':'Pass'}
export async function loadSubjects(studentId){const d=await api(`/api/json/subjects?studentId=${encodeURIComponent(studentId)}`);return d.data}
export async function saveSubject(subject){return api('/api/json/subjects',{method:'POST',body:JSON.stringify(subject)})}
export async function updateSubject(id,patch){return api(`/api/json/subjects/${encodeURIComponent(id)}`,{method:'PUT',body:JSON.stringify(patch)})}
export async function deleteSubject(id){return api(`/api/json/subjects/${encodeURIComponent(id)}`,{method:'DELETE'})}
