package fr.afcepf.springws.init;

import javax.annotation.PostConstruct;

import fr.afcepf.springws.dao.PaysDao;
import fr.afcepf.springws.entity.Devise;
import fr.afcepf.springws.entity.Pays;
import fr.afcepf.springws.service.DeviseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;



@Profile("initData")//en développement seulement , pas en production 
@Component
public class InitDataSet {
	
	@Autowired
	private DeviseService deviseService;

	@Autowired
	private PaysDao paysDao;
	
	
	@PostConstruct()
	public void initData() {

		Devise euro = deviseService.sauvegarderDevise(new Devise("EUR","euro",0.9));

		Pays f = new Pays("fr","France","Paris");
		f.setDevise(euro);		paysDao.save(f);
		Pays a = new Pays("de","Allemagne","Berlin");
		a.setDevise(euro);		paysDao.save(a);
		
		deviseService.sauvegarderDevise(new Devise("USD","dollar",1.0));
		deviseService.sauvegarderDevise(new Devise("GBP","livre",0.8));
		deviseService.sauvegarderDevise(new Devise("JPY","yen",120.0));
	}

}
