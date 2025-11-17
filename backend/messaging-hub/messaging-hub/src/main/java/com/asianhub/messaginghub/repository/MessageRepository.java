package com.asianhub.messaginghub.repository;

import com.asianhub.messaginghub.model.ChannelType;
import com.asianhub.messaginghub.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByChannelTypeOrderByTimestampDesc(ChannelType channelType);
    List<Message> findAllByOrderByTimestampDesc();
}