package com.github.dirkraft.trekker.model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("human")
public class Human extends Actor {

}
