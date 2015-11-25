package com.github.dirkraft.trekker.model.jpa;

import com.github.dirkraft.trekker.model.Ghost;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity(name = "Ghost")
@DiscriminatorValue("ghost")
public class GhostJpa extends ActorJpa implements Ghost {
}
