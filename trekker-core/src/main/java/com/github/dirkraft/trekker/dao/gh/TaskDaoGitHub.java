package com.github.dirkraft.trekker.dao.gh;

import com.github.dirkraft.trekker.dao.TaskDao;
import com.github.dirkraft.trekker.model.Task;

import java.util.Optional;

public class TaskDaoGitHub extends BaseDaoGitHub<Task> implements TaskDao {

  @Override
  public Optional<Task> get(Long id) {
    return null;
  }

  @Override
  public void save(Task task) {

  }
}
