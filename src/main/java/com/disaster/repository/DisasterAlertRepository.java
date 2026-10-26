package com.disaster.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.disaster.entity.DisasterAlert;
public interface DisasterAlertRepository extends

                                        JpaRepository<DisasterAlert , Long>
{
	
	

}
