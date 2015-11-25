package com.github.dirkraft.trekker.model.jpa;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity(name = "Human")
@DiscriminatorValue("human")
public class HumanJpa extends ActorJpa {

}
