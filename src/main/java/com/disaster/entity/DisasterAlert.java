package com.disaster.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "disaster_alerts")
public class DisasterAlert {
	
	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	    private String title;
	    private String disasterType;
	    private String location;
	      private String severity;
	     private String description;
	     private  String status;
	       private  LocalDateTime createdAt;

		public DisasterAlert() {
			super();
			
		}

		public DisasterAlert(Long id, String title, String disasterType, String location, String severity,
				String description, String status, LocalDateTime createdAt) {
			super();
			this.id = id;
			this.title = title;
			this.disasterType = disasterType;
			this.location = location;
			this.severity = severity;
			this.description = description;
			this.status = status;
			this.createdAt = createdAt;
		}

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}

		public String getDisasterType() {
			return disasterType;
		}

		public void setDisasterType(String disasterType) {
			this.disasterType = disasterType;
		}

		public String getLocation() {
			return location;
		}

		public void setLocation(String location) {
			this.location = location;
		}

		public String getSeverity() {
			return severity;
		}

		public void setSeverity(String severity) {
			this.severity = severity;
		}

		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}

		public LocalDateTime getCreatedAt() {
			return createdAt;
		}

		public void setCreatedAt(LocalDateTime createdAt) {
			this.createdAt = createdAt;
		}
		
		
}