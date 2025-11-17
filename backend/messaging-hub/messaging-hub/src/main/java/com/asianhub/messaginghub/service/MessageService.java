package com.asianhub.messaginghub.service;

import com.asianhub.messaginghub.model.Message;
import com.asianhub.messaginghub.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    public Message sendMessage(Message message) {
        return messageRepository.save(message);
    }

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    public void deleteMessage(Long id) {
        messageRepository.deleteById(id);
    }
}