package com.github.dirkraft.trekker.model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("ghost")
public class Ghost extends Actor {
}
