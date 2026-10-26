package com.disaster.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.disaster.entity.DisasterAlert;
import com.disaster.service.DisasterAlertService;

@RestController
@RequestMapping("/api/alerts")
@CrossOrigin(origins = "http://localhost:5173")
public class DisasterAlertController {
	
	private final DisasterAlertService service;

	public DisasterAlertController(DisasterAlertService service) {
		super();
		this.service = service;
	}
	@GetMapping
	public List <DisasterAlert> showAll () {
		
		return service.showAll();
		
	}
	@GetMapping("{id}")
	public DisasterAlert showById( @PathVariable Long id) {
		
		return service.showById(id);
		
		
	}
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public DisasterAlert createAlert
	(@RequestBody DisasterAlert alert) {
		
	return	service.create(alert);
		
		
	}
	
	    @PutMapping("/{id}")
	    public DisasterAlert updateAlert(
	    		
	            @PathVariable Long id,
	            
	            @RequestBody DisasterAlert alert){
	    	
	        return service.updateAlert(id, alert);
	    }
	    
	    @DeleteMapping("/{id}")
	    @ResponseStatus(HttpStatus.NO_CONTENT)
	    public void deleteAlert(@PathVariable Long id) {
	    	
	        service.deleteAlert(id);
	    }
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
