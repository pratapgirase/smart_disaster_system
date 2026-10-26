package com.disaster.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.disaster.entity.DisasterAlert;
import com.disaster.repository.DisasterAlertRepository;

@Service
public class DisasterAlertService {
	
	private DisasterAlertRepository repository;

	public DisasterAlertService(DisasterAlertRepository repository) {
		super();
		this.repository = repository;
	}
	
	public List <DisasterAlert> showAll () {
		
		return repository.findAll();
	}
	
	 public DisasterAlert showById(Long id) {
		 
	        return repository.findById(id)
	        		
	                .orElseThrow(() ->
	                
	                    new RuntimeException("Disaster Alert not found with ID: " + id));
	    }
	
	public DisasterAlert create (DisasterAlert alert) {
		
	DisasterAlert created =	repository.save(alert);
	
	return created;
	
	}
	
	 public DisasterAlert updateAlert(Long id, DisasterAlert updatedAlert) {
	        DisasterAlert existingAlert = showById(id);

	        existingAlert.setTitle(updatedAlert.getTitle());
	        existingAlert.setDisasterType(updatedAlert.getDisasterType());
	        existingAlert.setLocation(updatedAlert.getLocation());
	        existingAlert.setSeverity(updatedAlert.getSeverity());
	        existingAlert.setDescription(updatedAlert.getDescription());
	        existingAlert.setStatus(updatedAlert.getStatus());

	        return repository.save(existingAlert);
	    }
	
	
	 public void deleteAlert(Long id) {
		 
	        DisasterAlert alert = showById (id);
	        
	        repository.delete(alert);
	        
	    }
	
}
