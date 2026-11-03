
export function paginer <T> (liste:T[], page:number, parPage:number){
  const totalPages = Math.ceil(liste.length / parPage);
  const debut = (page - 1) * parPage;
  const fin = debut + parPage;
  const elements = liste.slice(debut, fin);

  return { elements, totalPages };
 }